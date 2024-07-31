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