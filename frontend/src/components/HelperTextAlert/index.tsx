import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HelperTextType } from "../ArticleForm";

interface Props {
  open: boolean;
  handleClose: () => void;
  helperText: HelperTextType;
}

export default function HelperTextAlert({
  open,
  handleClose,
  helperText,
}: Props) {
  return (
    <Collapse in={open}>
      <Alert
        severity={helperText.success ? "success" : "error"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {helperText.message}
      </Alert>
    </Collapse>
  );
}
