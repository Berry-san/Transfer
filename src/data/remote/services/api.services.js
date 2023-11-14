import { apiClient, apiEmailClient } from "../clients/api_client";
import { showErrorToast } from "../../../utils/api-utils";

export class APIService {
  static extractServerError(error) {
    let extracted;
    if (error.isAxiosError) {
      if (error.request) {
        extracted = ["Network error occurred"];
      } else {
        extracted = ["An unexpected error occurred"];
      }
    } else {
      extracted = [error.message || "An unexpected error occurred"];
    }
    extracted.forEach((e) => showErrorToast(e));
  }

  //add files API CALL
  static async addFiles(userCredentials) {
    try {
      return apiClient.post("/identity_uploaded", userCredentials);
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }

  //send file as email
  static async sendFiles(userCredentials) {
    try {
      return apiClient.post("/email_message", userCredentials);
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }

  //get uploaded files
  static async uploadedFiles(userCredentials) {
    try {
      return apiClient.get(`/document_details?image=${userCredentials}`);
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }

  //upload file
  static async fileUpload(userCredentials) {
    try {
      return apiClient.post("/user_document_creation", userCredentials);
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }

  //get upload file
  static async getUpload() {
    try {
      return apiClient.get("/document_list");
    } catch (error) {
      APIService.extractServerError(error);
      throw error;
    }
  }
}
