import { SuccessResponse } from './SuccessResponse'
import { FailureResponse } from './FailureResponse'

export default class ApiClient {
  public static async get<T>(path: string) {
    const url = ApiClient.getUrl(path)
    const opt = {}
    return ApiClient.api<T>(url, opt)
  }

  public static async post<T>(path: string, body?: {}) {
    const url = ApiClient.getUrl(path)
    const opt = {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: body ? JSON.stringify(body) : ''
    }
    return ApiClient.api<T>(url, opt)
  }

  public static async postData<T>(path: string, data: FormData) {
    const url = ApiClient.getUrl(path)
    const opt = {
      method: 'POST',
      body: data
    }
    return ApiClient.api<T>(url, opt)
  }

  public static async patch<T>(path: string, body?: {}) {
    const url = ApiClient.getUrl(path)
    const opt = {
      method: 'PATCH',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: body ? JSON.stringify(body) : ''
    }
    return ApiClient.api<T>(url, opt)
  }

  public static async patchData<T>(path: string, data: FormData) {
    const url = ApiClient.getUrl(path)
    const opt = {
      method: 'PATCH',
      body: data
    }
    return ApiClient.api<T>(url, opt)
  }

  public static async delete<T>(path: string) {
    const url = ApiClient.getUrl(path)
    const opt = {
      method: 'DELETE'
    }
    return ApiClient.api<T>(url, opt)
  }

  protected static api<T>(url: RequestInfo, opt: RequestInit) {
    return fetch(url, opt)
      .catch(ApiClient.handleNetworkError)
      .then(ApiClient.handleError)
      .then(response => response.json())
      .then(json => json as T)
      .then(dto => ({ data: dto, success: true } as SuccessResponse<T>))
      .catch(error => ({ detail: error, success: false } as FailureResponse))
  }

  protected static handleNetworkError(error: Error) {
    throw new Error(error.message)
  }

  protected static handleError(response: void | Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (response) {
        if (!response.ok) {
          if (response.status >= 500 && response.status < 600) {
            response
              .json()
              .then(body => {
                reject()
              })
              .catch(() => {
                reject()
              })
          }
        } else {
          resolve(response)
        }
      } else {
        reject()
      }
    })
  }

  /**
   * ルート以下のパスを受け取って、環境ごとにurlを生成します。
   * @param path
   */
  protected static getUrl(path: string) {
    const host =
      process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'localhost:80/api'
        : '3.112.204.124/api'

    return `http://${host}${path}`
  }
}
