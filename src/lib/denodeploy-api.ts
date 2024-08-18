import { get } from "svelte/store";
import { API_KEY } from "./store";
import ky from "ky";
import type { APIError, Project } from "./types/DenoDeploy";

/**
 * プロジェクトの詳細を取得
 * @param projectId プロジェクトID(UUIDまたはプロジェクト名)
 * @returns 
 */
export const fetchProject = async (projectId: string) => {
    if (!projectId) { return null; }

    const BASE_URL = 'https://api.deno.com/v1/projects/:project_id:';
    const url = BASE_URL.replace(':project_id:', projectId);
    const data = await ky
        .get(url, {
            headers: {
                authorization: `Bearer ${get(API_KEY)}`
            }
        })
        .json<Project | APIError>();
    return data;
}

/**
 * APIエラーか
 * @param apiResponse APIレスポンス
 * @returns 
 */
export const isAPIError = (apiResponse: any): apiResponse is APIError  => {
    const result = !!(apiResponse as APIError)?.code && !!(apiResponse as APIError)?.message;
    return result;
}
