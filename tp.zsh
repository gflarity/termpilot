run_termpilot () {
    echo
    tmpfile=$(mktemp /tmp/termpilot.XXXXXX)
    eval "termpilot.ts $tmpfile < $TTY" 
    zle reset-prompt
    BUFFER=`cat $tmpfile`
    zle end-of-line
}

zle -N run_termpilot
bindkey '^\\' run_termpilot
