/**
 * API問い合わせで失敗した場合
 * 
 * ex.
 * {
 *  "code": "malformedRequest",
 *  "message": "'organization_id' route parameter can not be parsed into a uuid"
 * }
 */
export type APIError = {
    code: string,
    message: string
}

export type Project = {
    id: string,
    name: string,
    description: string
    updatedAt: string,
    createdAt: string,
}

export type Deployment = {
    id: string,
    projectId: string,
    description: string,
    status: string
    domains: string[],
    databases: {
        "default": string
    },
    requestTimeout: null,
    permissions: {
        "net": null
    },
    createdAt: string,
    updatedAt: string
}