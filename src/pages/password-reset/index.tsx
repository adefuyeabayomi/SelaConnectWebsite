import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { D_TextInput } from "../../components/input";
import { ButtonMain } from "../../components/button";
import authService from "../../service/authService";
import { useLoading } from "../../contexts/LoadingContext";

export default function ResetPasswordPage(): React.JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken") || "";
  const [feedback, setFeedback] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const { setLoading, setLoadingText } = useLoading();

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      setFeedback("Password must be at least 8 characters long.");
      setIsValid(false);
      return;
    }

    setLoadingText("Resetting Password...");
    setLoading(true);

    try {
      const response = await authService.resetPassword(resetToken, newPassword);
      // Handle success response
      console.log("Password reset successful:", response.message);
      setFeedback("Password reset successful.");
      setIsValid(true);
    } catch (error) {
      // Handle error response
      console.error("Password reset failed:", error);
      setFeedback("Password reset failed. Please try again.");
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid no-space">
        <div className="row no-space justify-content-center">
            <div className="reset-password-page p-3 center col-12 col-sm-10 col-md-6">
            <div className="py-4" />
            <h2 className="text-center">Reset Your Password</h2>
            <D_TextInput
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={setNewPassword}
                feedbackText={feedback}
                valid={isValid}
                dark={false}
            />
            <div className="py-2" />
            <div onClick={handleResetPassword}>
                <ButtonMain actionFn={handleResetPassword} style={{ marginTop: "20px" }}>
                Reset Password
                </ButtonMain>
            </div>
            <div className="py-4" />
            </div>
        </div>
    </div>
  );
}
