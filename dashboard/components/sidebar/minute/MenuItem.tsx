export default function MenuItem(props: any) {
  return (
    <a href={props.href}>
      <div className="flex gap-2 py-3 cursor-pointer px-4 rounded-lg w-full hover:bg-[#BA4B32] transition-all duration-200 hover:text-white">
        <div className="icon">
          <div dangerouslySetInnerHTML={{ __html: props.icon }} />
        </div>
        <div className="hidden md:block name capitalize">{props.name}</div>
      </div>
    </a>
  );
}
