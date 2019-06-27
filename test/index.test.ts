import { SendGridMailAdapter } from "../src"

describe("SendGridAdapter", () => {
  it("should throw error when adapter options are not valid", () => {
    const adapterError =
      "SendGrid requires an API Key and a From Email Address."
    expect(() => SendGridMailAdapter({})).toThrowError(adapterError)
    expect(() =>
      SendGridMailAdapter({ apiKey: "", fromEmail: "" })
    ).toThrowError(adapterError)
  })
})
