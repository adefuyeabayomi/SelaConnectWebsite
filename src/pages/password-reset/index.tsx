import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { D_TextInput } from "../../components/input";
import { ButtonMain } from "../../components/button";
import authService from "../../service/authService";
import { useLoading } from "../../contexts/LoadingContext";
import DModal from "../../components/modal";

export default function ResetPasswordPage(): React.JSX.Element {
  const [newPassword, setNewPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken") || "";
  const [feedback, setFeedback] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [modalOpen,setModalOpen] = useState(false)
  let [modalTitle,setModalTitle] = useState('')
  let [modalBody,setModalBody] = useState('')

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
      console.log("Password reset successful:", response.message)
      setModalOpen(true)
      setModalTitle('Password Reset successfully')
      setModalBody('You can now proceed to login with your new password on the app.')
      setIsValid(true)
    } catch (error: any) {
      // Handle error response
      console.error("Password reset failed:", error)
      setIsValid(false)
      setModalOpen(true)
      setModalTitle('Error')
      setModalBody('Unable to reset password' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid no-space">
        <DModal onClose={()=> setModalOpen(!modalOpen)} isOpen={modalOpen}>
            <h3>{modalTitle}</h3>
            <p>{modalBody}</p>
        </DModal>
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
