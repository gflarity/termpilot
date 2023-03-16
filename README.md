# TermPilot

TermPilot uses OpenAI GPT-3 to find the terminal command you're looking for, just type what you're looking to do in English. This is just the initial MVP. More polish and documentation is coming. 

## Installation / Setup 

1. Install Deno - https://deno.land/manual/getting_started/installation
2. Copy termpilot.ts into your path somewhere (eg I use ~/bin which is in my path)
3. Source the shell script from your rc file or just copy it: tp.zsh 
4. Signup for OpenAI API access, then export OPENAI_API_TOKEN environment with your secret/token.
5. Review the license and remember that you're expected to double check the command provided doesn't break anything.

## Usage

1. Currently the shell script sets up ^\ (CTRL + \\) as the key binding for start termpilot.
2. Once the prompt is up, just enter what you'd like to accomplish in clear concise english (other languages might work?)
3. Select the command that best matches what you're looking to do.
4. Hit enter to run the command once you've tweaked it (and assuming you think it's safe!)

## CUSTOMIZATION

Check the source, all the API parameters sent to OpenAI API are environment variables with defaults.


## Contributing

I'm definitely looking to build a community and merge contributions. See the ROADMAP for things I'd like to do but don't necessarily have the bandwidth for personally.

## Roadmap

### Short Term

* bash integration on par with zsh integration
* when you ctrl-c out, it displays a bunch of exception logging, but really it should just exit quietly
* better shell integration, make it easy to specify a different shortcut besides ^\ (CTRL-\)
* any other shell integration that people care about
* having to use a temp file the way I do seems a bit hacky, I just don't have the shell-foo to improve on this.
* display a spinner while we're waiting on OpenAI
* make the UI look prettier
* going up after going down seems wonky, that's the library I use though

### Medium Term

* Having a separate command that generates howtos and displays them in a separate tmux pane or something like that
### Long Term

* local models so you don't have to pay for OpenAI api. Maybe LLAMA or a LLAMA derrivative can be used? 
