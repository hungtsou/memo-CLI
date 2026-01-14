#!/usr/bin/env node
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command(
    'test <note>',
    'test the note',
    yargs => {
      return yargs.positional('note', {
        describe:
          'The content of the note you want to test',
        type: 'string'
      })
    },
    argv => {
      console.log(argv.note)
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .parse()
