import * as Dialog from "@radix-ui/react-dialog";
import "./ConfirmModal.scss";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "danger" | "default";
}

export const ConfirmModal = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="confirm-modal-overlay" />
        <Dialog.Content className="confirm-modal-content" data-variant={variant}>
          <Dialog.Title className="confirm-modal-title">{title}</Dialog.Title>
          <Dialog.Description className="confirm-modal-description">
            {description}
          </Dialog.Description>
          <div className="confirm-modal-actions">
            <Dialog.Close asChild>
              <button
                type="button"
                className="confirm-modal-button confirm-modal-cancel"
                onClick={handleCancel}
              >
                {cancelLabel}
              </button>
            </Dialog.Close>
            <button
              type="button"
              className="confirm-modal-button confirm-modal-confirm"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
