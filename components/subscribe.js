/** @jsx jsx */
import React from 'react'
import {jsx} from 'theme-ui'
import {Label, Input, Button} from '@theme-ui/components'

const Subscribe = () => (
  <React.Fragment>
    <h2
      sx={{
        position: ['inherit', 'absolute'],
        px: 2,
        ml: -2,
        pb: 1,
        bg: 'background',
        mb: 2,
      }}
    >
      Learn the JavaScript Mental Models
    </h2>
    <form
      sx={{p: 4, border: '2px solid', borderColor: 'text', mt: [0, 50]}}
      action="https://app.convertkit.com/forms/812047/subscriptions"
      method="post"
    >
      <Label htmlFor="first_name">Your first name</Label>
      <Input
        aria-label="Your first name"
        name="fields[first_name]"
        id="first_name"
        placeholder="First name"
        type="text"
      />
      <Label sx={{mt: 2}} htmlFor="email_address">
        Your email address
      </Label>
      <Input
        aria-label="Your email address"
        name="email_address"
        id="email_address"
        placeholder="Email address"
        required
        type="email"
      />
      <Button sx={{mt: 3}}>Join Now</Button>
    </form>
  </React.Fragment>
)

export default Subscribe
