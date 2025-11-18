-- database_migration.sql

-- Add model_name and user_api_key_id to Agents table
ALTER TABLE Agents
ADD COLUMN model_name VARCHAR(100),
ADD COLUMN user_api_key_id UUID;

-- Create UserApiKeys table
CREATE TABLE UserApiKeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    key_alias VARCHAR(100) NOT NULL,
    encrypted_api_key TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Assuming a 'Users' table exists with 'id' as primary key
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES Users(id)
        ON DELETE CASCADE
);

-- Add foreign key constraint to Agents table
ALTER TABLE Agents
ADD CONSTRAINT fk_user_api_key
    FOREIGN KEY(user_api_key_id)
    REFERENCES UserApiKeys(id)
    ON DELETE SET NULL;
