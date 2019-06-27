import sgMail from "@sendgrid/mail"
import * as request from "request"

export interface AdapterOption {
  apiKey?: string
  fromEmail?: string
  passwordResetTemplateId?: string
  verificationTemplateId?: string
}

export interface SendMailOptions {
  to: string
  templateId: string

  dynamicTemplateData: { [x: string]: any }
}

export interface SendLinkOptions {
  link: string
  appName: string
  user: Parse.User
}

export type SendGridMailAdapterType = Readonly<{
  sendVerificationEmail: (
    options: SendLinkOptions
  ) => Promise<[request.Response, {}]>
  sendPasswordResetEmail: (
    options: SendLinkOptions
  ) => Promise<[request.Response, {}]>
  sendMail: (options: SendMailOptions) => Promise<[request.Response, {}]>
}>

export const SendGridMailAdapter = (
  adapterOptions: AdapterOption
): SendGridMailAdapterType => {
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
        appName: options.appName,
      },
    }
    return sgMail.send(msg)
  }

  const sendPasswordResetEmail = (options: SendLinkOptions) => {
    const msg = {
      to: options.user.get("email"),
      from: fromEmail,
      templateId: passwordResetTemplateId || "",
      dynamic_template_data: {
        username: options.user.get("username"),
        link: options.link,
        appName: options.appName,
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
