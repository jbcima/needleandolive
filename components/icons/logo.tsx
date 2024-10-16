export default function LogoIcon(props: React.ComponentProps<'img'>) {
  return (
    <img
      src="/logo.png"
      alt={`${process.env.SITE_NAME} logo`}
      {...props}
    />
  );
}