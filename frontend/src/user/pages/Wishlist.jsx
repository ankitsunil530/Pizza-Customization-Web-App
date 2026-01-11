export default function Wishlist() {
  const { wishlist } = useSelector(s => s.user);

  return wishlist.map(p => <div>{p.name}</div>);
}