import { IIconParams } from "./interfaces/IIconParams";

function IconChartHistogram({ size, stroke }: IIconParams) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-chart-histogram"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 3v18h18" />
      <path d="M20 18v3" />
      <path d="M16 16v5" />
      <path d="M12 13v8" />
      <path d="M8 16v5" />
      <path d="M3 11c6 0 5 -5 9 -5s3 5 9 5" />
    </svg>
  );
}

export default IconChartHistogram;
