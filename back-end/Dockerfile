
#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:15.10.0

WORKDIR /usr/src/app

COPY . .
RUN npm ci --quiet && npm run build



#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:15.10.0

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/build ./build