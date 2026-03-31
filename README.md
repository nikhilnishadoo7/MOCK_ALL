# 🚀 KYC Mock Microservices Backend

This project simulates real-world KYC providers like SurePass and SprintVerify using a microservices architecture. It is designed for testing, development, and understanding how external verification APIs behave (including latency, failures, and authentication).

---

# 📦 Services Overview

| Service      | Port | Description                |
| ------------ | ---- | -------------------------- |
| SurePass PAN | 3001 | PAN verification mock      |
| SprintVerify | 3002 | Alternate PAN provider     |
| GST Service  | 3003 | GST verification mock      |
| Passport     | 3004 | Passport verification mock |
| Gateway      | 3000 | Main entry point (if used) |

---

# ⚙️ Setup Instructions

```bash
npm install
npm run dev
```

---

# 🔐 Common Headers

All APIs require:

```http
Authorization: Bearer MOCK_TOKEN
Content-Type: application/json
X-Request-Id: <unique-id>
```

---

# 🧪 API Testing (cURL Examples)

---

## 🟡 1. SurePass PAN API

**Endpoint:**

```
http://localhost:3001/api/v1/pan/pan-adv-v2
```

**cURL:**

```bash
curl --location 'http://localhost:3001/api/v1/pan/pan-adv-v2' \
--header 'Authorization: Bearer MOCK_TOKEN' \
--header 'Content-Type: application/json' \
--header 'X-Request-Id: test-surepass-001' \
--data '{"pan_number":"NPRKS1293R"}'
```

---

## 🔵 2. SprintVerify PAN API

**Endpoint:**

```
http://localhost:3002/api/v1/sprintverify
```

**cURL:**

```bash
curl --location 'http://localhost:3002/api/v1/sprintverify' \
--header 'Authorization: Bearer MOCK_TOKEN' \
--header 'Content-Type: application/json' \
--header 'X-Request-Id: test-sprint-001' \
--data '{"idNumber": "NPRKS1293R"}'
```

---

## 🟢 3. GST API

**Endpoint:**

```
http://localhost:3003/gstin-api/fetch-detailed
```

**cURL:**

```bash
curl --location 'http://localhost:3003/gstin-api/fetch-detailed' \
--header 'Authorization: Bearer MOCK_TOKEN' \
--header 'Content-Type: application/json' \
--header 'X-Request-Id: test-gst-001' \
--data '{
  "gstin": "27AABCU4852C1ZH",
  "consent": "Y"
}'
```

---

## 🟣 4. Passport API

**Endpoint:**

```
http://localhost:3004/passport-api/fetch
```

**cURL:**

```bash
curl --location 'http://localhost:3004/passport-api/fetch' \
--header 'Authorization: Bearer MOCK_TOKEN' \
--header 'Content-Type: application/json' \
--header 'X-Request-Id: test-passport-001' \
--data '{"file_number": "MH9876543210", "date_of_birth": "2000-12-29", "consent": "Y"}'
```

---

# 🔥 Features

* ✅ Mock database for PAN, GST, Passport
* ✅ Simulated latency (500ms–1500ms)
* ✅ Random failure simulation (5–10%)
* ✅ Authentication middleware (Bearer token)
* ✅ Request tracing using `X-Request-Id`
* ✅ Structured success/error responses
* ✅ Multi-provider simulation (SurePass vs SprintVerify)

---

# ⚠️ Error Scenarios

| Scenario         | Response         |
| ---------------- | ---------------- |
| Missing token    | 401 Unauthorized |
| Invalid input    | 400 Bad Request  |
| Not found        | 404 Not Found    |
| Provider failure | 500 / 503        |

---

# 🧠 Purpose

This project helps simulate real-world third-party KYC APIs to:

* Test fallback mechanisms (SurePass → SprintVerify)
* Implement retry & circuit breaker patterns
* Handle latency and failure scenarios
* Build resilient backend systems

---

# 💡 Pro Tips

* Use Postman Runner for bulk testing
* Observe random failures to test retry logic
* Use logs with Request ID for debugging
* Extend with rate limiting or circuit breaker

---

# 🏁 Conclusion

This mock system replicates real KYC provider behavior and is ideal for:

* Backend development
* Microservices architecture practice
* Fintech / verification systems testing

---
