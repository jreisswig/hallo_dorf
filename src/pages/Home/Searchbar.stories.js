import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

import Searchbar from './Searchbar'

export default {
  title: 'Searchbar',
  decorators: [withKnobs]
}

export const standard = () => <Searchbar />
