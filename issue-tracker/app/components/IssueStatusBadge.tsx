import React from 'react';
import { Badge } from '@radix-ui/themes';
import { Status } from '@prisma/client';

const statusMap: Record<Status, { label: string; color: 'red' | 'green' | 'blue' }> = {
    OPEN: { label: 'Open', color: 'green' },
    IN_PROGRESS: { label: 'In Progress', color: 'blue' },
    CLOSED: { label: 'Closed', color: 'red' },
};

const IssueStatusBadge = ({ status }:{status: Status}) => {

return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
);
}   


export default IssueStatusBadge;