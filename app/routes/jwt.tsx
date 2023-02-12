import type { ActionArgs} from "@remix-run/node";
import { json } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"

import decodeJWT from '~/decodeJWT.server'

export async function action ({ request }: ActionArgs) {
  const formData = await request.formData()
  const token = formData.get('token')

  if (typeof token !== 'string') {
    throw new Error('no string')
  }

  const payload = decodeJWT(token)

  return json({
    payload
  })
}

export default function Jwt () {
  const actionData = useActionData<typeof action>()

  if (actionData?.payload) {
    return <p>Payload: {JSON.stringify(actionData.payload)}</p>
  }

  return <Form method='post'>
    <p>jwt</p>
    <input name="token" defaultValue="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"/>
    <br />
    <button type="submit">decode</button>
  </Form>
}

/**
 * browser console error
 * Uncaught ReferenceError: process is not defined at node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
 */