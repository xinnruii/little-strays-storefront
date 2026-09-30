alter table public.order_items
  add column if not exists preorder_wait_days integer
  check (preorder_wait_days is null or preorder_wait_days > 0);
