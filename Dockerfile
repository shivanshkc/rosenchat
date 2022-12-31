#------------------------------------------------------------------
FROM node:18 as builder

# Create and change to the 'source' directory.
WORKDIR /source

# Install dependencies.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the source code.
COPY . .

# Build browser bundles.
RUN npm run build

#-------------------------------------------------------------------
FROM nginx:1.21.6-alpine

# Copy the files to the production image from the builder stage.
COPY --from=builder /source/dist/rosenchat /dist
# NGINX configuration to serve the SPA.
COPY --from=builder /source/nginx/default.conf /etc/nginx/conf.d/default.conf

#-------------------------------------------------------------------
