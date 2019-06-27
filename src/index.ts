import {
  AdapterOption,
  SendLinkOptions,
  SendMailOptions,
  SengridMailAdapter,
} from "./types"
import sgMail from "@sendgrid/mail"

export const SendGridMailAdapter = (
  adapterOptions: AdapterOption
): SengridMailAdapter => {
  const {
    apiKey,
    fromEmail,
    passwordResetTemplateId,
    verificationTemplateId,
  } = adapterOptions

  if (
    !adapterOptions ||
    !apiKey ||
    !fromEmail ||
    apiKey === "" ||
    fromEmail === ""
  ) {
    throw "SendGrid requires an API Key and a From Email Address."
  }

  sgMail.setApiKey(apiKey)

  const sendVerificationEmail = (options: SendLinkOptions) => {
    const msg = {
      to: options.user.get("email"),
      from: fromEmail,
      templateId: verificationTemplateId || "",
      dynamic_template_data: {
        username: options.user.get("username"),
        link: options.link,
      },
    }
    return sgMail.send(msg)
  }

  const sendPasswordResetEmail = (options: SendLinkOptions) => {
    const msg = {
      to: options.user.get("email"),
      from: fromEmail,
      templateId: passwordResetTemplateId || "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      dynamic_template_data: {
        username: options.user.get("username"),
        link: options.link,
      },
    }
    return sgMail.send(msg)
  }

  const sendMail = (options: SendMailOptions) => {
    const msg = {
      to: options.to,
      from: fromEmail,
      templateId: options.templateId,
      dynamic_template_data: options.dynamicTemplateData,
    }
    return sgMail.send(msg)
  }

  return Object.freeze({
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail,
  })
}
