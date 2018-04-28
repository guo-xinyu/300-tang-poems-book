#!/bin/bash
ERROR=0

JS_FILE_PATTERN='\.js$'
JAVA_FILE_PATTERN='\.java$'
NON_FRM_FILE_PATTERN='.*[\\/]frm[\\/].*'

incError()
{
    ERROR=`expr $ERROR + 1`
}

#Eslint all JavaScript files
checkEslint()
{
    eslint -v >/dev/null 2>&1
    if [ $? -ne 0 ]
    then
        echo "Eslint not found."
        incError
        return 0
    fi

    local jsFiles=`git diff --cached --name-only --diff-filter=d | grep -iE $JS_FILE_PATTERN | grep -viE $NON_FRM_FILE_PATTERN`
    for item in $jsFiles
    do
        if [ -f $item ]
        then
            tmp=`eslint $item`
            if [ `echo "$tmp" | grep -Ec '\berror\b'` -gt 0 ]
            then
                incError
                echo "$tmp"
                echo ""
            fi

        fi
    done
}

#forbidden any 'CRLF'
checkCRLF()
{
    local allFiles=`git diff --cached --name-only --diff-filter=d | grep -viE $NON_FRM_FILE_PATTERN`
    for item in $allFiles
    do
        if [ -f $item ]
        then
            if [ `find $item -type f | xargs file | grep -c CRLF` -gt 0 ]
            then
                incError
                echo "$item: find CRLF."
            fi
        fi
    done
}

checkStyle()
{
    java -version >/dev/null 2>&1
    if [ $? -ne 0 ]
    then
        echo "Java not found. Please install Java or add Java to path."
        incError
        return 0
    fi

    local javaFiles=`git diff --cached --name-only --diff-filter=d | grep -iE $JAVA_FILE_PATTERN |grep -v '.*[\\/]test[\\/].*'`
    for item in $javaFiles
    do
        if [ -f $item ]
        then
            tmp=`java -jar check/checkstyle.jar -c check/checkstyle.xml $item`
            if [ `echo "$tmp" | grep -ivcE '(audit|warning)'` -gt 0 ]
            then
                incError
                echo "$tmp"
                echo ""
            fi
        fi
    done
}

checkCRLF
checkEslint
checkStyle
if [ $ERROR -gt 0 ]; then
    echo -e "\nCOMMIT REJECTED!"
    exit 1
fi
exit 0
