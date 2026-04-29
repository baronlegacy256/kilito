import os
import re

def fix_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    repls = [
        (r'\sclass="', ' className="'),
        (r'\stabindex="', ' tabIndex="'),
        (r'\sitemprop="', ' itemProp="'),
        (r'\sitemscope(?=[>\s])', ' itemScope'),
        (r'\sitemtype="', ' itemType="'),
        (r'\sitemid="', ' itemId="'),
        (r'\scharset="', ' charSet="'),
        (r'\sfor="', ' htmlFor="'),
        (r'\smaxlength="', ' maxLength="'),
        (r'\sonsubmit="', ' onSubmit="'),
        (r'\sonclick="', ' onClick="'),
        (r'\sonchange="', ' onChange="'),
        (r'\scolspan="', ' colSpan="'),
        (r'\srowspan="', ' rowSpan="'),
        (r'\sreadonly(?=[>\s])', ' readOnly'),
        (r'\sautocomplete="', ' autoComplete="'),
        (r'\sdatetime="', ' dateTime="'),
        (r'\saccesskey="', ' accessKey="'),
        (r'\scontenteditable="', ' contentEditable="'),
        (r'\sspellcheck="', ' spellCheck="'),
        (r'\smuted="muted"', ' muted'),
        (r' muted={true}', ' muted'),
    ]

    new_content = content
    for pattern, repl in repls:
        new_content = re.sub(pattern, repl, new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

root_dirs = [
    r'c:\Users\Administrator\Documents\barakatechlabs\kilito-next\components',
    r'c:\Users\Administrator\Documents\barakatechlabs\kilito-next\app'
]

for root_dir in root_dirs:
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.jsx', '.js')):
                file_path = os.path.join(root, file)
                if fix_file(file_path):
                    print(f"Fixed props in {file_path}")
