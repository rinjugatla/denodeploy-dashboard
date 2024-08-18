import { get } from "svelte/store";
import { API_KEY, DENO_ID } from "./store";
import ky, { HTTPError } from "ky";
import type { APIError, Deployment, Project } from "./types/DenoDeploy";

/**
 * プロジェクト一覧を取得
 * @returns 
 */
export const fetchProjects = async () => {
    const denoId = get(DENO_ID);
    const apiKey = get(API_KEY);
    if (!denoId || !apiKey) { return null; }

    const BASE_URL = 'https://api.deno.com/v1/organizations/:deno_id:/projects';
    const url = BASE_URL.replace(':deno_id:', denoId);
    try {
        const data = await ky
            .get(url, {
                headers: {
                    authorization: `Bearer ${apiKey}`
                }
            })
            .json<Project[]>();
        return data;
    } catch (error) {
        const result = {
            code: 'API Error',
            message: (error as HTTPError).message
        } as APIError;
        return result;
    }
};

/**
 * プロジェクトの詳細を取得
 * @param projectId プロジェクトID(UUIDまたはプロジェクト名)
 * @returns 
 */
export const fetchProject = async (projectId: string) => {
    if (!projectId) { return null; }

    const apiKey = get(API_KEY);
    if (!apiKey) { return null; }

    try {
        const BASE_URL = 'https://api.deno.com/v1/projects/:project_id:';
        const url = BASE_URL.replace(':project_id:', projectId);
        const data = await ky
            .get(url, {
                headers: {
                    authorization: `Bearer ${apiKey}`
                }
            })
            .json<Project>();
        return data;
    } catch (error) {
        const result = {
            code: 'API Error',
            message: (error as HTTPError).message
        } as APIError;
        return result;
    }
}

/**
 * プロジェクト内のデプロイ一覧を取得
 * @param projectId プロジェクトID(UUIDまたはプロジェクト名)
 * @returns 
 */
export const fetchDeployments = async (projectId: string) => {
    if (!projectId) { return null; }

    const apiKey = get(API_KEY);
    if (!apiKey) { return null; }

    try {
        const BASE_URL =
            'https://api.deno.com/v1/projects/:project_id:/deployments?limit=100&order=desc';
        const url = BASE_URL.replace(':project_id:', projectId);
        const response = await ky
            .get(url, {
                headers: {
                    authorization: `Bearer ${apiKey}`
                }
            })
            .json<Deployment[]>();
        return response;
    } catch (error) {
        const result = {
            code: 'API Error',
            message: (error as HTTPError).message
        } as APIError;
        return result;
    }
};

/**
 * APIエラーか
 * @param apiResponse APIレスポンス
 * @returns 
 */
export const isAPIError = (apiResponse: any): apiResponse is APIError => {
    const result = !!(apiResponse as APIError)?.code && !!(apiResponse as APIError)?.message;
    return result;
}
