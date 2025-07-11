import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Checkbox,
  Paper,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Link,
} from "@mui/material";
import { LinearProgress } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  FilterList as FilterListIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Upgrade as UpgradeIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import Logo from "@/assets/Logo.svg";

// mock data
const mockData = [
  {
    id: 1,
    fileName: "TSX_StudyResultsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 1,
    uploadDate: "Jun 05, 2025",
    conversionStatus: 50,
  },
  {
    id: 2,
    fileName: "TSX_PatientDataPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 3,
    uploadDate: "Jun 02, 2025",
    conversionStatus: 80,
  },
  {
    id: 3,
    fileName: "TSX_DrugResponsePart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 5,
    uploadDate: "Jun 01, 2025",
    conversionStatus: 80,
  },
  {
    id: 4,
    fileName: "TSX_SiteInfoPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 4,
    uploadDate: "Jun 01, 2025",
    conversionStatus: 60,
  },
  {
    id: 5,
    fileName: "TSX_EnrollmentStatsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 1,
    uploadDate: "May 28, 2025",
    conversionStatus: 90,
  },
  {
    id: 6,
    fileName: "TSX_DemoMetricsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 2,
    uploadDate: "May 27, 2025",
    conversionStatus: 100,
  },
  {
    id: 7,
    fileName: "TSX_ProtocolDetailsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 5,
    uploadDate: "May 23, 2025",
    conversionStatus: 80,
  },
  {
    id: 8,
    fileName: "TSX_LabReportsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 1,
    uploadDate: "May 23, 2025",
    conversionStatus: 60,
  },
  {
    id: 9,
    fileName: "TSX_MonitoringNotesPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 1,
    uploadDate: "May 15, 2025",
    conversionStatus: 80,
  },
  {
    id: 10,
    fileName: "TSX_AdverseEventsPart1ClinicalTrial.xml",
    size: "200 KB",
    icsrCount: 2,
    uploadDate: "May 05, 2025",
    conversionStatus: 100,
  },
];

type Row = (typeof mockData)[number];

export default function DashboardTable() {
  const columns = useMemo(
    () =>
      [
        { id: "fileName", label: "File Name" },
        { id: "icsrCount", label: "ICSR Count" },
        { id: "uploadDate", label: "Upload Date" },
        { id: "conversionStatus", label: "Conversion Status" },
      ] as const,
    []
  );

  const [orderBy, setOrderBy] = useState<keyof Row>("fileName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState<{ [key in keyof Row]?: string }>({});

  const filtered = useMemo(
    () =>
      mockData.filter((row) =>
        Object.entries(filters).every(([key, value]) =>
          value
            ? row[key as keyof Row]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : true
        )
      ),
    [filters]
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const aVal = a[orderBy],
          bVal = b[orderBy];
        return (
          (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (order === "asc" ? 1 : -1)
        );
      }),
    [filtered, orderBy, order]
  );

  const visibleRows = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage]
  );

  const handleSort = (col: keyof Row) => {
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation Bar */}
      <AppBar
        position='static'
        color='transparent'
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "grey.200", bgcolor: "white" }}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to='/'
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component='img'
              src={Logo}
              alt='SafetyXchange Logo'
              sx={{ height: 40, width: 40, borderRadius: "50%" }}
            />
            <Typography
              variant='h6'
              component='span'
              sx={{ ml: 2, mr: 4, fontWeight: "bold", color: "primary.main" }}
            >
              TrialSafetyXchange
            </Typography>
          </Link>

          <Button color='inherit'>Dashboard</Button>
          <Button color='inherit'>Reports</Button>

          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant='contained'
            color='primary'
            startIcon={<UpgradeIcon />}
            sx={{ ml: 2 }}
          >
            Upgrade
          </Button>

          <IconButton color='inherit'>
            <NotificationsIcon />
          </IconButton>

          <IconButton color='inherit'>
            <SettingsIcon />
          </IconButton>

          <IconButton color='inherit'>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' gutterBottom>
          PharmaCompany's Workspace
        </Typography>

        {/* Top Cards Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <InsertDriveFileIcon sx={{ fontSize: 48, color: "#1976d2" }} />
                <Typography variant='h5' component='div'>
                  ICSR Converted
                </Typography>
                <Typography variant='h4' color='text.secondary'>
                  10 / 20
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <CloudUploadIcon sx={{ fontSize: 60, color: "#aaa" }} />
                <Typography variant='h6' gutterBottom>
                  Click or drag file to this area to upload
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Support for a single upload, 500KB max size.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters and Search Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Chip label='Filter 1' onDelete={() => {}} sx={{ mr: 1 }} />
          <Chip label='Filter 2' onDelete={() => {}} sx={{ mr: 1 }} />
          <Chip label='Filter 3' onDelete={() => {}} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Pushes filters to left, Filter button to right */}
          <Button variant='outlined' startIcon={<FilterListIcon />}>
            Filters
          </Button>
        </Box>
        <Paper elevation={1}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TableSortLabel
                          active={orderBy === col.id}
                          direction={orderBy === col.id ? order : "asc"}
                          onClick={() => handleSort(col.id)}
                        >
                          {col.label}
                        </TableSortLabel>
                        <TextField
                          variant='standard'
                          placeholder='Search'
                          size='small'
                          sx={{ ml: 1, flex: 1 }}
                          onChange={(e) =>
                            setFilters((f) => ({
                              ...f,
                              [col.id]: e.target.value,
                            }))
                          }
                          value={filters[col.id] || ""}
                        />
                      </Box>
                    </TableCell>
                  ))}
                  <TableCell>E2B R3 File</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox />
                        <Typography fontWeight='bold'>
                          {row.fileName}
                        </Typography>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{ ml: 1 }}
                        >
                          {row.size}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.icsrCount}</TableCell>
                    <TableCell>{row.uploadDate}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant='determinate'
                            value={row.conversionStatus}
                          />
                        </Box>
                        <Typography variant='body2'>
                          {row.conversionStatus}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{/* Icon buttons for actions */}</TableCell>
                    <TableCell>{/* More menu */}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component='div'
            count={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Container>
    </Box>
  );
}
