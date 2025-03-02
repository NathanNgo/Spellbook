#!/bin/sh

WORKDIR=$1

rm "${WORKDIR}/src/database/spellbook.db"
bash "${WORKDIR}/bin/start.sh" "${WORKDIR}"
