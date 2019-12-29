vegeta attack -duration=60s -rate=10000 -targets=performance-test/account-api.list -output=performance-test/account-report.bin
vegeta report "performance-test/account-report.bin"