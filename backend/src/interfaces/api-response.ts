export interface ApiResponse {
  status: {
    error_code: number;
    error_message?: string;
  }
}