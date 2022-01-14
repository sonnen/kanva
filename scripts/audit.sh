#!/usr/bin/env bash

# The yarn audit will exit with a non-0 exit code if there are issues of any severity found. The exit code will be a mask of the severities.

# 1 for INFO
# 2 for LOW
# 4 for MODERATE
# 8 for HIGH
# 16 for CRITICAL
# For example, if only INFO and MODERATE vulnerabilities were found, then the exit code will be 1 + 4 = 5

yarn audit; [[ $? -ge 8 ]] && exit 1 || exit 0
