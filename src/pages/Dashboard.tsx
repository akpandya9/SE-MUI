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
  CloudUploadRounded as CloudUploadIcon,
  FilterListRounded as FilterListIcon,
  InsertDriveFileRounded as InsertDriveFileIcon,
  UpgradeRounded as UpgradeIcon,
  NotificationsRounded as NotificationsIcon,
  SettingsRounded as SettingsIcon,
  AccountCircleRounded as AccountCircleIcon,
  InsertDriveFileRounded as FileIcon,
  ReportRounded as NoFileIcon,
  CloudDownloadRounded as CloudDownloadIcon,
  MoreVertRounded as MoreVertIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import Logo from "@/assets/Logo.svg";
import { data } from "@/lib/columns";
import E2BPreviewDialog from "@/components/E2BPreviewDialog";
import { sampleMissingElements, sampleXmlContent } from "@/lib/constants";

type Row = (typeof data)[number];

export default function DashboardTable() {
  const columns = useMemo(
    () =>
      [
        {
          id: "fileName",
          label: "File Name",
          sortable: true,
          searchable: true,
        },
        {
          id: "uploadDate",
          label: "Upload Date",
          sortable: true,
          searchable: true,
        },
        {
          id: "conversionStatus",
          label: "Conversion Status",
          sortable: true,
          searchable: false,
        },
      ] as const,
    []
  );

  const [orderBy, setOrderBy] = useState<keyof Row>("fileName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<Partial<Record<keyof Row, string>>>(
    {}
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [xmlPopData, setXmlPopData] = useState({
    conversionStatus: "0",
    fileName: "",
    uploadedOn: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const visible = visibleRows.map((r) => r.id);
    if (e.target.checked) {
      setSelectedIds(new Set([...selectedIds, ...visible]));
    } else {
      const keep = new Set([...selectedIds]);
      visible.forEach((id) => keep.delete(id));
      setSelectedIds(keep);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    setSelectedIds(next);
  };

  const filtered = useMemo(
    () =>
      data.filter((row) =>
        columns.every(
          (col) =>
            !col.searchable ||
            !filters[col.id]?.trim() ||
            row[col.id]
              .toString()
              .toLowerCase()
              .includes(filters[col.id]!.toLowerCase())
        )
      ),
    [filters, columns]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[orderBy];
      let bVal = b[orderBy];

      if (orderBy === "uploadDate") {
        aVal = a.uploadDateRaw;
        bVal = b.uploadDateRaw;
      }

      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return order === "asc" ? cmp : -cmp;
    });
  }, [filtered, orderBy, order]);

  const visibleRows = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage]
  );

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

        {/* Table component */}
        <Paper>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      indeterminate={
                        selectedIds.size > 0 &&
                        selectedIds.size < visibleRows.length
                      }
                      checked={
                        visibleRows.every((r) => selectedIds.has(r.id)) &&
                        visibleRows.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id}>
                      {col.sortable ? (
                        <TableSortLabel
                          active={orderBy === col.id}
                          direction={orderBy === col.id ? order : "asc"}
                          onClick={() => {
                            const isAsc = orderBy === col.id && order === "asc";
                            setOrder(isAsc ? "desc" : "asc");
                            setOrderBy(col.id);
                          }}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                      {col.searchable && (
                        <TextField
                          variant='standard'
                          placeholder='Search'
                          size='small'
                          value={filters[col.id] ?? ""}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              [col.id]: e.target.value,
                            })
                          }
                          sx={{ ml: 1 }}
                        />
                      )}
                    </TableCell>
                  ))}
                  <TableCell>E2BR3 File</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedIds.has(row.id)}
                        onChange={(e) =>
                          handleSelectRow(row.id, e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight='bold'>{row.fileName}</Typography>
                    </TableCell>
                    <TableCell>{row.uploadDate}</TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <Box flexGrow={1} mr={1}>
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
                    <TableCell>
                      <IconButton
                        size='small'
                        onClick={() => {
                          setXmlPopData({
                            conversionStatus: String(row.conversionStatus),
                            fileName: row.fileName,
                            uploadedOn: new Date(
                              row.uploadDate
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }),
                          });
                          setTimeout(() => {
                            setIsDialogOpen(true);
                          }, 500);
                        }}
                      >
                        {row.e2bR3File ? (
                          <FileIcon sx={{ color: "green" }} />
                        ) : (
                          <NoFileIcon sx={{ color: "red" }} />
                        )}
                      </IconButton>
                      <IconButton size='small'>
                        <CloudDownloadIcon sx={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size='small'>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Paper>

        <E2BPreviewDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          xmlContent={sampleXmlContent}
          missingElements={sampleMissingElements}
          conversionStatus={Number(xmlPopData.conversionStatus)}
          fileName={xmlPopData.fileName}
          uploadedOn={xmlPopData.uploadedOn}
        />
      </Container>
    </Box>
  );
}
