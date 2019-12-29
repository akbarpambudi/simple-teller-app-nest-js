vegeta attack -duration=60s -rate=1000 -targets=performance-test/account-transaction-api.list -output=performance-test/account-trx-report.bin
vegeta report "performance-test/account-trx-report.bin"