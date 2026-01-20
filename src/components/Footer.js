import { Box, Typography, Stack, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        px: { xs: 3, md: 6 },
        py: 4,
        background:
          "linear-gradient(135deg, rgba(20,30,48,0.95), rgba(36,59,85,0.95))",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "white",
        borderRadius: "10px"
      }}
    >
      <Stack spacing={3}>
        {/* Top Row */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Gully CricBuzz
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 320 }}>
              Real-time cricket scoring platform built for local and gully
              matches.
            </Typography>
          </Box>

          <Stack direction="row" spacing={4}>
            <FooterColumn
              title="Product"
              items={["Live Matches", "Create Match", "Scoreboard"]}
            />
            <FooterColumn
              title="Tech"
              items={["React", "Node.js", "MongoDB", "Socket.io"]}
            />
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom Row */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Gully CricBuzz. All rights reserved.
          </Typography>

          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            Built by Arnab • Full Stack Project
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ---------- Footer Column ---------- */
function FooterColumn({ title, items }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, opacity: 0.8, fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Stack spacing={0.5}>
        {items.map((item) => (
          <Typography
            key={item}
            variant="caption"
            sx={{ opacity: 0.65 }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
