#! /bin/bash
echo "Rodando testes para gerar o report..."
dateNow=$(date +%s)
report="report-${dateNow}"
path="./__tests__/reports/${report}"
mkdir $path
PUPPETEER_SNAPSHOTS=$path npm run test:dev $1 &> "${path}/jest.log"
cd $path
tar -czf "../${report}.tar.gz" *
echo "Arquivo gerado em ${path}/jest.log"
echo "Relatório compactado em ${path}.tar.gz"
