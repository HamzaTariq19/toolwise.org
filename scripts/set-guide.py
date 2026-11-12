# Replace a guide's FAQs and body but keep its seoTitle and metaDescription.
# Usage: python3 scripts/set-guide.py <slug> < new.md   (new.md = "faqs:" YAML block, a line "---", then the Markdown body)
import sys, re
slug = sys.argv[1]; path = f'src/content/tools/{slug}.md'
old = open(path).read(); new = sys.stdin.read()
fm = re.match(r'---\n(.*?)\n---\n', old, re.S).group(1)
keep = [l for l in fm.split('\n') if l.startswith(('seoTitle:', 'metaDescription:'))]
faqs, body = new.split('\n---\n', 1)
open(path, 'w').write('---\n' + '\n'.join(keep) + '\n' + faqs.strip() + '\n---\n\n' + body.strip() + '\n')
