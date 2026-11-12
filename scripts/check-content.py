# Validates tool content frontmatter (YAML) and reports guide length. Usage: python3 scripts/check-content.py [slugs...]
import yaml, glob, re, sys, os
files = [f'src/content/tools/{s}.md' for s in sys.argv[1:]] or sorted(glob.glob('src/content/tools/*.md'))
bad = 0
for f in files:
    _, fm, body = open(f).read().split('---', 2)
    try:
        d = yaml.safe_load(fm); assert 3 <= len(d['faqs']) <= 6, 'need 3-6 faqs'
    except Exception as e:
        bad += 1; print('ERROR', f, str(e).splitlines()[0]); continue
    words = len(re.findall(r'[A-Za-z0-9]+', body))
    if len(sys.argv) > 1 or words < 380: print(f'{os.path.basename(f)[:-3]:34} body {words}')
sys.exit(1 if bad else 0)
