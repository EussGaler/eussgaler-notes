"""Portable source/build checks. Run with Python 3.11+ from any directory."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit, unquote
import argparse
import json
import re
import sys
import tomllib

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
SITE = ROOT / 'site'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Document(HTMLParser):
    def __init__(self, content_math_only=False):
        super().__init__(convert_charrefs=True)
        self.refs, self.math, self.ids = [], [], set()
        self.depth, self.math_depth, self.math_parts = 0, None, []
        self.content_math_only, self.article_depth = content_math_only, None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'): self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if attrs.get(key): self.refs.append((tag, key, attrs[key]))
        if tag not in VOID: self.depth += 1
        if tag == 'article' and 'md-content__inner' in attrs.get('class', '').split(): self.article_depth = self.depth
        if 'arithmatex' in attrs.get('class', '').split() and (not self.content_math_only or self.article_depth is not None):
            self.math_depth, self.math_parts = self.depth, []
    def handle_endtag(self, tag):
        if tag in VOID: return
        if self.math_depth == self.depth:
            self.math.append(''.join(self.math_parts))
            self.math_depth, self.math_parts = None, []
        if self.article_depth == self.depth: self.article_depth = None
        self.depth -= 1
    def handle_data(self, data):
        if self.math_depth is not None: self.math_parts.append(data)

def math_key(value):
    value = value.strip()
    if value.startswith(('\\[', '\\(')): value = value[2:-2]
    return re.sub(r'\s+', '', value)

def source_math(src):
    src = re.sub(r'^(?:[ \t]*>[ \t]?)+', '', src, flags=re.M)
    src = re.sub(r'```[^\n]*\n[\s\S]*?```', '', src)
    display = []
    def take(m):
        display.append(m[1])
        return ''
    src = re.sub(r'\$\$([\s\S]*?)\$\$', take, src)
    inline = re.findall(r'(?<!\\)\$([^$]*?)(?<!\\)\$', src)
    return display, inline

def nav_paths(value):
    if isinstance(value, str): yield value
    elif isinstance(value, list):
        for item in value: yield from nav_paths(item)
    elif isinstance(value, dict):
        for item in value.values(): yield from nav_paths(item)

def run(built=False):
    issues, stats = [], []
    config = tomllib.loads((ROOT/'zensical.toml').read_text('utf-8'))
    for ref in nav_paths(config['project']['nav']):
        if not urlsplit(ref).scheme and not (DOCS/ref).is_file(): issues.append('Missing navigation page: '+ref)
    for page in sorted(DOCS.rglob('*.md')):
        text = page.read_text('utf-8-sig')
        rel = page.relative_to(DOCS).as_posix()
        h1_count = len(re.findall(r'^# ', text, re.M))
        if h1_count != 1 and not (rel == 'index.md' and h1_count == 0):
            issues.append('Expected one H1: '+rel)
        if re.search(r'<!--|原笔记旁注：|根据原笔记.*草图重绘|[CD]:[\\/]|页码与原文件对应表',text): issues.append('Unwanted/private marker: '+rel)
        parsed = Document(); parsed.feed(text)
        refs = [m[1] for m in re.finditer(r'!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)',text)]
        refs += [r for _,_,r in parsed.refs]
        for ref in refs:
            p = urlsplit(ref)
            if p.scheme or p.netloc or not p.path: continue
            resolved = (page.parent/unquote(p.path)).resolve()
            if not resolved.is_relative_to(DOCS.resolve()) or not resolved.is_file(): issues.append(f'Missing/unsafe link: {rel}: {ref}')
        display, inline = source_math(text)
        stat = {'page':rel,'display_math':len(display),'inline_math':len(inline)}
        if built:
            out = SITE/page.relative_to(DOCS).with_suffix('')/'index.html' if page.name!='index.md' else SITE/page.relative_to(DOCS).with_suffix('.html')
            if not out.is_file(): issues.append('Missing built page: '+str(out)); continue
            doc = Document(content_math_only=True); doc.feed(out.read_text('utf-8'))
            expected, actual = Counter(map(math_key,display+inline)), Counter(map(math_key,doc.math))
            if expected != actual:
                issues.append({'page':rel,'missing_math':list((expected-actual).elements())[:4],'unexpected_math':list((actual-expected).elements())[:4]})
            stat['built_math']=len(doc.math)
            for tag,key,ref in doc.refs:
                p=urlsplit(ref)
                if p.scheme or p.netloc or not p.path: continue
                candidate = (SITE/unquote(p.path).lstrip('/')) if p.path.startswith('/') else out.parent/unquote(p.path)
                if p.path.endswith('/'): candidate /= 'index.html'
                if not candidate.exists(): issues.append(f'Broken built resource: {rel}: {ref}')
        stats.append(stat)
    if len(list((DOCS/'courses/system-modeling/assets').glob('fig-*.png'))) != 4: issues.append('Expected four final figures')
    for p in DOCS.rglob('*'):
        if p.is_file() and any(x in p.parts for x in ['pic','参考裁图','待审插图','.git']): issues.append('Private source in public docs: '+str(p))
    if built:
        home = SITE / 'index.html'
        if home.is_file() and 'md-sidebar md-sidebar--primary' not in home.read_text('utf-8'):
            issues.append('Homepage is missing the mobile navigation drawer')
    report={'ok':not issues,'issues':issues,'pages':stats}
    print(json.dumps(report,ensure_ascii=False,indent=2))
    return 0 if not issues else 1

if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--built',action='store_true')
    sys.exit(run(parser.parse_args().built))
