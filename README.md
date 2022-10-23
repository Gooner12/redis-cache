# Implementing Redis for caching.

This is a quick project to make use of Redis for in-memory caching showing the details on how to set and get keys with the expiration time. This project can be scaled to cache data in a real setting. In this project, the write back mechanism has been used instead of write through. Lastly, the expiration time can be omitted and can rely on the suitable eviction policy as we can reduce the memory usage by not storing the expiry time.
