import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonLoading({ count, height, margin, dark }) {
    const darkObj = {
        baseColor: '#504c4c',
        highlightColor: '#3b3939',
    };
    return (
        <SkeletonTheme {...(dark ? darkObj : {})}>
            {Array.from({ length: count }).map((_, index) => (
                <p key={index}>
                    <Skeleton height={height} count={1} style={{ margin: `${margin}px 0px` }} />
                </p>
            ))}
        </SkeletonTheme>
    );
}

export default SkeletonLoading;
