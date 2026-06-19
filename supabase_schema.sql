-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS programming_logic_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  code_example TEXT,
  category TEXT CHECK (category IN ('condition', 'loop', 'branch')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE programming_logic_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON programming_logic_items
  FOR SELECT USING (true);

-- Allow authenticated insert/update/delete (or you can restrict by role)
CREATE POLICY "Allow all for authenticated" ON programming_logic_items
  FOR ALL TO authenticated USING (true);

-- Insert some initial data
INSERT INTO programming_logic_items (title, description, code_example, category)
VALUES 
('If-Else Yapısı', 'Belirli bir koşulun doğru olup olmadığını kontrol eder.', 'if (hava_yagmurlu) {\n  semsiye_al();\n} else {\n  gunes_gozlugu_tak();\n}', 'condition'),
('For Döngüsü', 'Belirli bir sayıda tekrarlanması gereken işlemler için kullanılır.', 'for (let i = 0; i < 10; i++) {\n  console.log("Adım: " + i);\n}', 'loop'),
('Switch-Case', 'Bir değişkenin farklı değerlerine göre farklı işlemler yapar.', 'switch (gun) {\n  case "Pazartesi":\n    is_basi();\n    break;\n  default:\n    dinlen();\n}', 'condition');

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS for contact messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to send a message
CREATE POLICY "Allow anon insert" ON contact_messages
  FOR INSERT TO public WITH CHECK (true);

-- Allow everyone to read (for the simple admin panel)
CREATE POLICY "Allow read access" ON contact_messages
  FOR SELECT TO public USING (true);

-- Allow everyone to delete (protected by our UI password in this simple version)
CREATE POLICY "Allow delete for all" ON contact_messages
  FOR DELETE TO public USING (true);
