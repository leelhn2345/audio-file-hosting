#
# Entrypoint for the Makefile
#
# It is composed at mk/*.mk by including
# small make files which provides all the necessary target(s).
#
# Some considerations:
#
# - By default the 'help' target is executed.
# - No parallel jobs are executed from the main Makefile,
#   so that multiple targets from the command line will be
#   executed in serial.
# - Create 'mk/*.mk' for custom targets.
#

## Colours
# example usage with other makefiles
#
# ```mk
# @printf "${GREEN}hello world${RESET}\n"
# ```
GREEN := \033[32m
RED := \033[31m
YELLOW := \033[33m
BLUE := \033[34m
RESET := \033[0m

include mk/*.mk

.NOT_PARALLEL:

# Set the default target
.DEFAULT_GOAL := help

