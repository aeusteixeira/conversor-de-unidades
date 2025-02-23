<?php include('components/header.php'); ?>

    <main class="container bg-light p-4 my-5 shadow-lg flex-grow-1">
        <div class="text-center">
            <h1>Conversor de Unidades 🔢</h1>
            <p>Conversor de unidades online para converter moedas, temperaturas, pesos, medidas e tempo.</p>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <label for="converterType" class="form-label fw-bold">Selecione o tipo de conversão:</label>
                <select id="converterType" class="form-select mb-3" onchange="updateConverter()">
                    <option value="moeda">
                        💲 Moeda
                    </option>
                    <option value="temperatura">
                        🌡️ Temperatura
                    </option>
                    <option value="peso">
                        ⚖️ Peso
                    </option>
                    <option value="medida">
                        📏 Medida
                    </option>
                    <option value="tempo">
                        ⏰ Tempo
                    </option>
                </select>
                <label for="inputValue" class="form-label fw-bold">Insira o valor a ser convertido:</label>
                <input type="number" id="inputValue" class="form-control mb-3" placeholder="Insira o valor">
                <label for="fromUnit" class="form-label fw-bold">Selecione a unidade de origem:</label>
                <select id="fromUnit" class="form-select mb-3"></select>
                <label for="toUnit" class="form-label fw-bold">Selecione a unidade de destino:</label>
                <select id="toUnit" class="form-select mb-3"></select>
                <button class="btn btn-primary w-100" onclick="convert()">Converter</button>
            </div>
            <div class="col-sm-12 col-md-6">
                <h3 class="mt-4" id="result"></h3>
                <hr>
                <h4>Histórico</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Conversão</th>
                        </tr>
                    </thead>
                    <tbody id="history"></tbody>
                </table>
                <div class="mt-4 text-center">
    <p class="fw-semibold text-muted">💡 Ajude a manter o projeto online</p>

    <!-- Modal para exibir o código PIX -->
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#pixModal">
        Doar via PIX
    </button>

    <div class="modal fade" id="pixModal" tabindex="-1" aria-labelledby="pixModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="pixModalLabel">Doar via PIX</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="img/pix.png" alt="QR Code PIX" class="img-fluid mb-3">
                    <p class="fw-bold">Chave PIX:</p>
                    <p class="text-primary">f80b5f2f-746e-467b-a4b4-7921bec5ee09</p>
                </div>
            </div>
   

            </div>
        </div>
    </main>

<?php include('components/footer.php'); ?>