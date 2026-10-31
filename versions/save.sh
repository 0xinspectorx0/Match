#!/bin/sh
# Kullanım: sh versions/save.sh "kisa-ad" "commit mesaji"
cd /home/user || exit 1
N=$(ls versions/v[0-9][0-9][0-9]-*.html 2>/dev/null | wc -l); N=$(printf "%03d" $((N+1)))
F="versions/v$N-$(TZ=Europe/Istanbul date +%Y%m%d-%H%M)-$1.html"
cp index.html "$F"
git add index.html versions tools 2>/dev/null
git -c user.email=arena@local -c user.name=Arena commit -qm "v$N: $2" && echo "kaydedildi: $F" && git log --oneline -1
