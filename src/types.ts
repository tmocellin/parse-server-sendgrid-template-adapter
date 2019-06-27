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

export type SengridMailAdapter = Readonly<{
  sendVerificationEmail: (
    options: SendLinkOptions
  ) => Promise<[request.Response, {}]>
  sendPasswordResetEmail: (
    options: SendLinkOptions
  ) => Promise<[request.Response, {}]>
  sendMail: (options: SendMailOptions) => Promise<[request.Response, {}]>
}>
