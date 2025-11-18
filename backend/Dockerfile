# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Cloud Run will set PORT environment variable)
EXPOSE 8080

# Set environment variable for production
ENV PYTHONUNBUFFERED=1

# Command to run the application
# Cloud Run sets PORT env variable, we'll use it
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}