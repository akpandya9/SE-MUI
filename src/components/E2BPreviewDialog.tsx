import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  LinearProgress,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DownloadIcon from "@mui/icons-material/Download";

interface MissingElement {
  id: number;
  field: string;
  message: string;
}

interface E2BPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  xmlContent: string;
  conversionStatus: number; // 0–100
  missingElements: MissingElement[];
  fileName: string;
  uploadedOn: string;
}

const E2BPreviewDialog: React.FC<E2BPreviewDialogProps> = ({
  isOpen,
  onClose,
  xmlContent,
  conversionStatus,
  missingElements,
  fileName,
  uploadedOn,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h6' fontWeight='bold'>
          {fileName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant='body2' color='text.secondary' sx={{ mr: 2 }}>
            Uploaded On: {uploadedOn}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ height: fullScreen ? "auto" : "80vh", p: 0 }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* XML Preview */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderRight: { md: `1px solid ${theme.palette.divider}` },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 3, pb: 1 }}>
              <Typography variant='subtitle1' fontWeight='medium'>
                E2BR3 Preview
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.5 }}
              >
                Converting E2B R2 to E2B R3 format
              </Typography>
            </Box>
            <Box
              component='pre'
              sx={{
                flexGrow: 1,
                m: 3,
                bgcolor: "background.paper",
                borderRadius: 1,
                p: 2,
                fontFamily: "monospace",
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                overflow: "auto",
              }}
            >
              {xmlContent}
            </Box>
          </Grid>

          {/* Status & Missing */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant='subtitle1' fontWeight='medium'>
                Conversion Status
              </Typography>
              <Box sx={{ mt: 1, mb: 1 }}>
                <LinearProgress
                  variant='determinate'
                  value={conversionStatus}
                />
              </Box>
              <Typography variant='body2' align='right' color='text.secondary'>
                {conversionStatus}%
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 3, pt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ReportProblemIcon color='error' sx={{ mr: 1 }} />
                <Typography variant='subtitle1' color='error'>
                  {missingElements.length} Required Missing Elements
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: "auto", pr: 1 }}>
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
                  {missingElements.map((m) => (
                    <Box key={m.id} sx={{ display: "flex", mb: 1 }}>
                      <ReportProblemIcon
                        color='error'
                        fontSize='small'
                        sx={{ mt: 0.3, mr: 1 }}
                      />
                      <Typography variant='body2'>
                        <strong>
                          {m.id}. {m.field}:
                        </strong>{" "}
                        {m.message}
                      </Typography>
                    </Box>
                  ))}
                </ul>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "flex-end",
          p: 3,
          gap: 1,
        }}
      >
        <Button
          variant='outlined'
          startIcon={<DownloadIcon />}
          onClick={() => {
            /* implement download E2B R3 */
          }}
        >
          Download E2BR3 File
        </Button>
        <Button
          variant='contained'
          startIcon={<DownloadIcon />}
          onClick={() => {
            /* implement download missing report */
          }}
        >
          Download Missing Elements Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default E2BPreviewDialog;
