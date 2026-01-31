# MongoDB Atlas Setup for Production

## Quick Setup (5 minutes):

1. **Go to MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Create free account** and **new cluster**
3. **Create database user**:
   - Username: `portfolio`
   - Password: `portfolio123`
4. **Whitelist IP**: Add `0.0.0.0/0` (allow all IPs)
5. **Get connection string**: 
   ```
   mongodb+srv://portfolio:portfolio123@cluster0.mongodb.net/portfolio-builder?retryWrites=true&w=majority
   ```

## For Render Deployment:

The `render.yaml` is already configured with the MongoDB Atlas connection string.

## For Local Development:

Update your `.env` file:
```
MONGODB_URI=mongodb+srv://portfolio:portfolio123@cluster0.mongodb.net/portfolio-builder?retryWrites=true&w=majority
```

## Connection Features:
- ✅ Auto-retry on connection failure
- ✅ Production-ready connection pooling
- ✅ Graceful shutdown handling
- ✅ Connection health checks